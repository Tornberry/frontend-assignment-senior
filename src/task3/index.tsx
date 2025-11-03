import { FC } from "react";
import { FormProvider, useForm } from "./context/form-context";
import Input from "../task2/components/Input";
import Select from "../task2/components/Select";
import Button from "../task2/components/Button";
import "./index.scss";

const Step1: FC = () => {
  const { formData, errors, updateField, nextStep } = useForm();

  console.log(errors)

  return (
    <div className="form-step">
      <h2>Step 1: Personal Information</h2>

      <Input
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        placeholder="Enter your name"
        helperText="LMAO"
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
        placeholder="Enter your email"
        required
      />

      <div className="form-actions">
        <Button onClick={nextStep} variant="primary" size="medium">
          Next
        </Button>
      </div>
    </div>
  );
};

const Step2: FC = () => {
  const { formData, errors, updateField, nextStep, prevStep } = useForm();

  return (
    <div className="form-step">
      <h2>Step 2: Contact Details</h2>

      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        error={errors.phone}
        placeholder="Enter your phone number"
        required
      />

      <Input
        label="Address"
        type="text"
        value={formData.address}
        onChange={(e) => updateField("address", e.target.value)}
        error={errors.address}
        placeholder="Enter your address"
        required
      />

      <div className="form-actions">
        <Button onClick={prevStep} variant="secondary" size="medium">
          Previous
        </Button>
        <Button onClick={nextStep} variant="primary" size="medium">
          Next
        </Button>
      </div>
    </div>
  );
};

const Step3: FC = () => {
  const { formData, errors, updateField, prevStep, submitForm, isSubmitting } = useForm();

  return (
    <div className="form-step">
      <h2>Step 3: Preferences</h2>

      <Select
        label="Preferred Contact Method"
        value={formData.preferences}
        onChange={(e) => updateField("preferences", e.target.value)}
        error={errors.preferences}
        required
      >
        <option value="">Select an option</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="mail">Mail</option>
      </Select>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => updateField("newsletter", e.target.checked)}
          />
          Subscribe to newsletter
        </label>
      </div>

      <div className="form-actions">
        <Button onClick={prevStep} variant="secondary" size="medium" disabled={isSubmitting}>
          Previous
        </Button>
        <Button onClick={submitForm} variant="primary" size="medium" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

const MultiStepForm: FC = () => {
  const { currentStep } = useForm();

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>1</div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>2</div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>3</div>
      </div>

      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
    </div>
  );
};

const Task3: FC = () => {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
};

export default Task3;