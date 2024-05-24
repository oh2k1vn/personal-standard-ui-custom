---
sidebar_position: 2
---

# Bottom Sheet

#### Tailwind CSS React Bottom Sheet

## Basic example

```jsx
import { BottomSheet, IBottomSheet } from "personal-standard-ui-custom";

const DemoBottomSheet = () => {
  const bottomSheetRef = React.useRef < IBottomSheet > null;

  const handleOpen = () => {
    bottomSheetRef.current.open();
  };

  const handleClose = () => {
    bottomSheetRef.current.close();
  };

  return (
    <>
      <button onClick={handleOpen}>Open Bottom Sheet</button>
      <button onClick={handleClose}>Close Bottom Sheet</button>

      <BottomSheet ref={bottomSheetRef} setHeight={100} title="title" iconClose>
        Content
      </BottomSheet>
    </>
  );
};
```
