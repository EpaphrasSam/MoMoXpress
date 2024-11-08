import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  newsletterSchema,
  type NewsletterFormData,
} from "@/schemas/newsletterSchema";
import { subscribeToNewsletter } from "@/services/newsletterService";

interface NewsletterProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultPhone: string;
}

const Newsletter = ({
  isOpen,
  onClose,
  onSuccess,
  defaultPhone,
}: NewsletterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      phoneNumber: defaultPhone,
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await subscribeToNewsletter(data.phoneNumber);
      toast.success("Successfully subscribed to newsletter!");
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      classNames={{
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Join Our Newsletter
        </ModalHeader>
        <ModalBody>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-default-400">
              Stay updated with our latest rates and features. We&apos;ll send
              you updates about new services and promotions.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
                errorMessage={errors.phoneNumber?.message}
                startContent={<FaEnvelope className="text-default-400" />}
              />

              <div className="flex gap-2 justify-end">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  startContent={<FaTimes />}
                >
                  No, thanks
                </Button>
                <Button type="submit" color="primary" isLoading={isSubmitting}>
                  Subscribe
                </Button>
              </div>
            </form>
          </motion.div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Newsletter;
