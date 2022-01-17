import { Button, Spinner } from "react-bootstrap";

const CustomBlockButton = ({
  disabled,
  type,
  showSpinner,
  loadingText,
  defaultText,
  variant,
}) => {
  return (
    <div className="d-grid gap-2 my-2">
      <Button
        variant={variant ? variant : "primary"}
        disabled={disabled}
        type={type ? type : "button"}
      >
        {showSpinner && (
          <Spinner
            as="span"
            variant="light"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {showSpinner ? loadingText : defaultText}
      </Button>
    </div>
  );
};

export default CustomBlockButton;
