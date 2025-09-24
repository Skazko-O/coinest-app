import Button from 'react-bootstrap/Button';

function BlockBtn({label = 'Add New Recipient', variant = 'primary'}) {
  return (
    <div className="d-grid">
      <Button variant={variant} size="lg">
        {label}
      </Button>
    </div>
  );
}

export default BlockBtn;