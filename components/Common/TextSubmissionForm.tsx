"use client";

import { FormEvent, useState } from "react";

type SubmissionType = "feedback" | "custom-version";

type TextSubmissionFormProps = {
  title: string;
  caption: string;
  submissionType: SubmissionType;
  submitLabel: string;
};

const TextSubmissionForm = ({
  title,
  caption,
  submissionType,
  submitLabel,
}: TextSubmissionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setStatusType(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      submissionType,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your request.");
      }

      setStatusType("success");
      setStatusMessage("Your message has been sent successfully.");
      event.currentTarget.reset();
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-16 pt-8 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="mx-auto max-w-[860px]">
          <div className="wow fadeInUp shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px]">
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              {title}
            </h2>
            <p className="mb-12 text-base font-medium leading-relaxed text-body-color">
              {caption}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Write your message"
                      required
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    ></textarea>
                  </div>
                </div>

                <div className="w-full px-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-sm bg-[#ffdd00] px-9 py-4 text-base font-semibold text-[#090a3a] duration-300 hover:bg-[#f2cf00] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : submitLabel}
                  </button>

                  {statusMessage && (
                    <p
                      className={`mt-4 text-sm font-medium ${
                        statusType === "success" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {statusMessage}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextSubmissionForm;
