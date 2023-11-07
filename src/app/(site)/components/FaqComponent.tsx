import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import FaqItem from '~/app/(site)/components/FaqItem';

const DATA = [
  {
    question: `Do you offer a free plan?`,
    answer: `Yes, we offer a free plan with plenty of components to build full websites. No credit card required.`,
  },
  {
    question: `In what frameworks are the components available?`,
    answer: `We built all components using Tailwind CSS and React and Next.js.`,
  },
  {
    question: `Can I cancel my subscription?`,
    answer: `You can cancel your subscription at any time. You can do this from your account settings.`,
  },
  {
    question: `Can I use the components in commercial projects?`,
    answer: `Yes, you are allowed to use the components in commercial projects, including client projects. However, you cannot resell or redistribute the components for page builders or as a UI library like this one.`,
  },
  {
    question: `How many components are available?`,
    answer: `Since we are just starting, we have a few available. We are adding many new components every week.`,
  },
  {
    question: `Where can I find my invoices?`,
    answer: `You can find your invoices in your account settings.`,
  },
  {
    question: `What payment methods do you accept?`,
    answer: `We accept all major credit cards and PayPal.`,
  },
];

const FaqComponent = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DATA.map((item) => {
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      };
    }),
  };

  return (
    <div>
      <script
        key={'ld:json'}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Container>
        <div className={'flex flex-col space-y-8 my-8'}>
          <div className={'flex flex-col items-center space-y-4'}>
            <Heading type={1}>FAQ</Heading>

            <SubHeading>Frequently Asked Questions</SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-xl items-center justify-center'
            }
          >
            <div className="flex w-full flex-col">
              {DATA.map((item, index) => {
                return <FaqItem key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FaqComponent;
