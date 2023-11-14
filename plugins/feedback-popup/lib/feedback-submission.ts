enum FeedbackSubmissionType {
  Bug = 'bug',
  Feedback = 'feedback',
  Question = 'question',
}

interface FeedbackSubmission {
  id: number;
  type: FeedbackSubmissionType;
  text: string;
  metadata?: unknown;
  screenName?: string;
  createdAt?: string;
  userId?: string;
  email?: string;
  embedding?: number[];
  attachmentUrl?: string;

  deviceInfo?: {
    screen_size: {
      width: string;
      height: string;
    };

    user_agent: string;
  };
}

export default FeedbackSubmission;
