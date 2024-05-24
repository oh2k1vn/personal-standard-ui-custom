---
sidebar_position: 6
---

# Inputs

#### Tailwind CSS React Inputs

Use responsive inputs component with helper examples for number input, phone number, password, text input, disabled & more. Free download, open-source license.

## Basic example

A basic example of the input field consists of the input element with specified ID and label element connected via this ID with the input.

```jsx
import { Input } from "personal-standard-ui-custom";

const DemoInput = () => {
  const [value, setValue] = React.useState("");

  return (
    <Input type="text" onChange={(event) => setValue(event.target.value)} />
  );
};
```
