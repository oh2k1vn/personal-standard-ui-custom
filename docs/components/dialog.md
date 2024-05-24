---
sidebar_position: 4
---

# Dialog

#### Tailwind CSS React Modal / Dialog

Use responsive modal component with helper examples for modal ui, popup, open modal, full screen modal, center position & more. Open source license.

## Basic example

```jsx
import { Dialog, eventBus, useDialog } from "personal-standard-ui-custom";

const DemoInput = () => {
  const dialogRef = React.useRef(null);

  const { open, close } = useDialog(dialogRef);

  const handleOpen = () => {
    open();
  };

  const handleClose = () => {
    close();
  };

  return (
    <>
      <button onClick={handleOpen}>Open Dialog</button>
      <button onClick={handleClose}>Close Dialog</button>

      <Dialog ref={dialogRef} />
    </>
  );
};
```
