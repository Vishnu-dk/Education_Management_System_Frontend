import { Box, Flex, Text, Button, Dialog } from "@chakra-ui/react";

import { MdWarning } from "react-icons/md";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  confirmColor = "#EF4444",
  loading = false,
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
    >
      <Dialog.Backdrop bg="rgba(15,23,42,0.4)" />

      <Dialog.Positioner>
        <Dialog.Content
          bg="white"
          borderRadius="16px"
          maxW="420px"
          w="full"
          p="6"
          boxShadow="
                        0 20px 60px
                        rgba(15,23,42,0.18)
                    "
        >
          <Flex direction="column" gap="4">
            <Flex align="center" gap="3">
              <Flex
                w="40px"
                h="40px"
                borderRadius="10px"
                bg="#FEF2F2"
                justify="center"
                align="center"
              >
                <MdWarning size={20} color="#EF4444" />
              </Flex>

              <Text fontSize="16px" fontWeight="700" color="#0F172A">
                {title}
              </Text>
            </Flex>

            <Text fontSize="14px" color="#475569" lineHeight="1.6">
              {message}
            </Text>

            <Flex justify="flex-end" gap="2" mt="2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                borderRadius="8px"
              >
                Cancel
              </Button>

              <Button
                size="sm"
                loading={loading}
                onClick={onConfirm}
                bg={confirmColor}
                color="white"
                borderRadius="8px"
                _hover={{
                  opacity: 0.9,
                }}
              >
                {confirmLabel}
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
