---
sidebar_position: 5
---

# Toggle

#### Tailwind CSS React Toggle

Use responsive switch component with helper examples for toggle buttons & checkbox switches, all with dark mode support. See examples & use them for free.

## Basic example

A basic example of the input field consists of the input element with specified ID and label element connected via this ID with the input.

```jsx
import { Toggle } from "personal-standard-ui-custom";

const DemoToggle = () => {
  const [value, setValue] = React.useState(false);

  return <Toggle label="label" value={value} onChange={(e) => setValue(e)} />;
};
```
