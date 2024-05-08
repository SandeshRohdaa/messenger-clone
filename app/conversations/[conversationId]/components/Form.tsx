"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      messages: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    try {
      axios.post("/api/messages", {
        ...data,
        conversationId,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpload = (result: any) => {
    try {
      axios.post("/api/messages", {
        image: result?.info?.secure_url,
        conversationId,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className="
  py-4
  px-4
  bg-gray-100
  border-t
  flex
  items-center
  gap-2
  lg:gap-4
  w-full
  "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="vdwttulm"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      {/* photo icon styling */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
        rounded-full
        p-2
        bg-sky-400
        cursor-pointer
        hover:bg-sky-500
        transition
        "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
