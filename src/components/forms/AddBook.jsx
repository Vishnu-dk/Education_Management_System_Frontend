import React, { useState } from "react";

import {
  Button,
  Input,
  Stack,
  NativeSelectRoot,
  NativeSelectField,
  Dialog,
  Portal,
} from "@chakra-ui/react";

import { useAddBookMutation } from "../../store/api/librarianApi";

export default function AddBook({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState("");

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async () => {
    try {
      await addBook({
        title,

        author,

        publisher,

        publicationYear: Number(publicationYear),

        category,

        totalCopies: Number(totalCopies),
      }).unwrap();

      onClose();

      setTitle("");
      setAuthor("");
      setPublisher("");
      setPublicationYear("");
      setCategory("");
      setTotalCopies("");
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
              <Dialog.Title>Add Book</Dialog.Title>
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
                  placeholder="Publication Year"
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                />

                <Input
                  placeholder="Total Copies"
                  type="number"
                  value={totalCopies}
                  onChange={(e) => setTotalCopies(e.target.value)}
                />

                <NativeSelectRoot>
                  <NativeSelectField
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>

                    <option value="PROGRAMMING">PROGRAMMING</option>

                    <option value="DATABASE">DATABASE</option>

                    <option value="NETWORKING">NETWORKING</option>

                    <option value="DATA_SCIENCE">DATA_SCIENCE</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="outline" mr="2" onClick={onClose}>
                Cancel
              </Button>

              <Button
                colorPalette="blue"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Add Book
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
