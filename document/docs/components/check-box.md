---
sidebar_position: 3
---

# CheckBox

#### Tailwind CSS React Checkbox

Use responsive checkbox component with helper examples for checkbox input, custom checkbox style, disabled checkbox & more. Free download, open-source license.

## Basic example

A basic example of the input field consists of the input element with specified ID and label element connected via this ID with the input.

```jsx
import { Checkbox } from "personal-standard-ui-custom";

const DemoCheckbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      type="checkbox"
      checked={checked}
      onChange={(event) => setIsChecked(e.target.checked)}
    />
  );
};
```
