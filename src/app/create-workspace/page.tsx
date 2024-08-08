'use client';

import { useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

import ImageUpload from "@/components/imageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateWorkspaceValues } from "@/hooks/createWorkspaceValues";
import { createWorkspace } from "@/actions/createWorkspace";
import { useRouter } from "next/navigation";

const CreateWorkspace = () => {
  const { currStep } = useCreateWorkspaceValues();

  let stepInView = null;

  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
  }

  return (
    <div className="p-5 grid place-content-center">
      <div className="p-3 max-w-[550px]">
        <Typography
          text={`step ${currStep} of 2`}
          variant="p"
          className="text-neutral-400"
        />

        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkspace;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();

  return (
    <>
      <Typography
        text="What’s the name of your company or team?"
        className="my-4"
      />

      <Typography
        text="This will be the name of your Slack workspace — choose something that your team will recognize."
        variant="p"
      />

      <form className="mt-6">
        <fieldset>
          <Input
            type="text"
            value={name}
            placeholder="Ex: Acme Marketing or Acme Co"
            onChange={event => updateValues({ name: event.target.value })}
          />
          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
            disabled={!name}
          >
            <Typography text="Next" variant="p" />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { setCurrStep, updateImageUrl, imageUrl, name } =
    useCreateWorkspaceValues();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const slug = slugify(name);
    const invite_code = uuid();
    const error = await createWorkspace({ imageUrl, name, slug, invite_code });
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);
      return toast.error("Couldn't create workspace. Please try again.");
    }
    toast.success("Workspace created successfully");
    router.push("/");
  };

  return (
    <>
      <Button
        size="sm"
        className="text-white"
        variant="link"
        onClick={() => setCurrStep(1)}
      >
        <Typography text="Back" variant="p" />
      </Button>

      <form>
        <Typography text="Add workspace avatar" className="my-4" />
        <Typography
          text="This image can be changed later in your workspace settings."
          variant="p"
        />

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageUrl("");
                handleSubmit();
              }}
            >
              <Typography text="Skip for now" variant="p" />
            </Button>

            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size="sm"
                variant="destructive"
              >
                <Typography text="Submit" variant="p" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="text-white bg-gray-500"
              >
                <Typography text="Select an Image" variant="p" />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};
