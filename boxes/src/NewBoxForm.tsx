import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { BoxInterface } from "./BoxInterface";

interface NewBoxFormProps {
  createBox: (arg: BoxInterface) => void;
}


/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height, width, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */
// (newBox: BoxInt): void      : ((BoxInt) => void)
function NewBoxForm({ createBox }: NewBoxFormProps)  {

  const initialFormState = {
    height: 0,
    width: 0,
    backgroundColor: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData(initialFormState);
  }

  return (
      <div className="NewBoxForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newBox-height">Height</label>
            <input
                id="newBox-height"
                onChange={handleChange}
                name="height"
                type="number"
                value={formData.height}
            />
          </div>
          <div>
            <label htmlFor="newBox-width">Width</label>
            <input
                id="newBox-width"
                onChange={handleChange}
                name="width"
                type="number"
                value={formData.width}
            />
          </div>
          <div>
            <label htmlFor="newBox-backgroundColor">Background Color</label>
            <input
                id="newBox-backgroundColor"
                onChange={handleChange}
                name="backgroundColor"
                value={formData.backgroundColor}
            />
          </div>
          <button className="NewBoxForm-addBtn">Add a new box!</button>
        </form>
      </div>
  );
}

export default NewBoxForm;
