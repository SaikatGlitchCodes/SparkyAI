import React from 'react';
import { ActionBar, Portal, Button } from "@chakra-ui/react";
import { LuShare } from 'react-icons/lu';

const ActionBarComponent = ({ isOpen, onClose, onAddCard }) => {
  return (
    <ActionBar.Root open={isOpen}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger onClick={onAddCard}>
              Add New Crop
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Button variant="outline" size="sm">
              <LuShare />
              Download Report
            </Button>
            <Button bg="red.400" onClick={onClose} size="sm">
              X
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
};

export default ActionBarComponent;