'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { supabaseBrowserClient } from "@/supabase/supabaseBrowserClient";
import { registerWithEmail } from "@/actions/registerWithEmail";


export default function Signup() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();

      if (session) {
        router.push("/");
      }
    };

    checkCurrentUser();
    setIsMounted(true);
  }, [router]);

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function socialAuth(provider: Provider) {
    setIsAuthenticating(true);
    setMessage(null);
    try {
      await supabaseBrowserClient.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/callback`,
        },
      });
    } catch (error) {
      console.error("OAuth sign-in error", error);
      setMessage("Failed to sign in with OAuth. Please try again.");
      setMessageType("error");
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    setMessage(null);
    try {
      const response = await registerWithEmail(values);
      const { data, error } = JSON.parse(response);

      if (error) {
        console.warn("Sign-up error", error);
        setMessage("Sign up failed. Please try again.");
        setMessageType("error");
        return;
      }

      setMessage("Sign-up successful! Check your email to confirm.");
      setMessageType("success");
    } catch (error) {
      console.error("Sign-up error", error);
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (!isMounted) return null;

  return (
    <div className="text-center p-5 grid gap-5 place-content-center">
      <div className="flex justify-center mb-5 items-center">
        <Image src="/slack.svg" alt="Slack Logo" width={30} height={30} />
        <Typography text="Slack" variant="h2" />
      </div>
      <Typography text="First, enter your email" variant="h1" />
      <Typography text="We suggest using the email address you use at work." variant="h6" />

      {message && (
        <div className={`mb-4 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name@work-email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="secondary"
              className={`bg-purple-900 hover:bg-purple-500 w-full my-5 text-white ${isAuthenticating ? "opacity-50 cursor-not-allowed" : ""}`}
              type="submit"
              disabled={isAuthenticating}
            >
              {isAuthenticating ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 border-t-transparent border-white rounded-full" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span className="ml-2">Signing up...</span>
                </div>
              ) : (
                <Typography text="Continue" variant="p" />
              )}
            </Button>
          </fieldset>
        </form>
      </Form>

      <div className="flex items-center my-6">
        <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
        <Typography text="OR" variant="p" />
        <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
      </div>

      <Button
        disabled={isAuthenticating}
        variant="outline"
        className="border-2 py-5 gap-3"
        onClick={() => socialAuth("google")}
      >
        <FcGoogle size={30} />
        <Typography className="text-xl" text="Sign In With Google" variant="p" />
      </Button>

      <div className="mt-5">
        <Typography text="Already using Slack?" variant="p" />
        <Link href="/signin" className="text-blue-600 hover:underline ml-1">
          Sign in to an existing workspace
        </Link>
      </div>
    </div>
  );
}
