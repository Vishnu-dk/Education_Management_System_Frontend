import React, { useState, useEffect } from "react";
import { Button, Input, Stack, Dialog, Portal } from "@chakra-ui/react";

import { useUpdateBookMutation } from "../../store/api/librarianApi";

export default function EditBook({ open, onClose, book }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [totalCopies, setTotalCopies] = useState(0);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublisher(book.publisher || "");
      setTotalCopies(book.totalCopies || 0);
    }
  }, [book]);

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleUpdate = async () => {
    try {
      await updateBook({
        bookId: book.id,

        data: {
          ...book,

          title,
          author,
          publisher,

          totalCopies: Number(totalCopies),
        },
      }).unwrap();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Book</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap="4">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <Input
                  placeholder="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />

                <Input
                  placeholder="Total Copies"
                  type="number"
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(e.target.value)}
                />
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" mr="2" onClick={onClose}>
                Cancel
              </Button>

              <Button
                colorPalette="blue"
                loading={isLoading}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
