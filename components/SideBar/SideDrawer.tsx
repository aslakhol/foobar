import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Link,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const SideDrawer = (props: Props) => {
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        aria-label="Open drawer"
        colorScheme="teal"
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Pages</DrawerHeader>

          <DrawerBody>
            <VStack>{children}</VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
