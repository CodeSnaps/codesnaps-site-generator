import Badge from '~/core/ui/Badge';
import FeedbackSubmission from '~/plugins/feedback-popup/lib/feedback-submission';

function FeedbackBadge({
  type,
  children,
}: React.PropsWithChildren<{
  type: FeedbackSubmission['type'];
}>) {
  const color = () => {
    switch (type) {
      case 'bug':
        return 'error';
      case 'question':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <Badge size={'small'} color={color()} className={'inline-flex'}>
      {children}
      <span className={'capitalize'}>{type}</span>
    </Badge>
  );
}

export default FeedbackBadge;
