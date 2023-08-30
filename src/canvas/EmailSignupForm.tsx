import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Input from '../components/Input';
import Container, { PaddingSize } from '../components/Container';
import Button from '../components/Button';
import { withContent } from '../hocs/withContent';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const FORM_SUBMIT_REDIRECT_URL = 'registered=true';

type EmailSignupFormProps = ComponentProps<{
  title: string;
  description?: string;
  submitButtonText?: string;
  backgroundImage: string;
}>;

const EmailSignupForm: FC<EmailSignupFormProps> = ({ title, description, submitButtonText = '', backgroundImage }) => {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target;
    setEmail(newValue);
    setIsError(!EMAIL_REGEX.test(newValue));
  }, []);

  const handleButtonClick = useCallback(() => router.replace(`${router.asPath}?${FORM_SUBMIT_REDIRECT_URL}`), [router]);

  return (
    <div className="relative">
      {Boolean(backgroundImage) && (
        <Image
          className="absolute w-full h-full object-cover"
          src={backgroundImage}
          fill
          alt="emailSignupForm-image"
          priority
        />
      )}
      <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None} backgroundClassName="pt-40">
        <div className="bg-neutral-800 md:bg-orange-900 relative md:-bottom-11 ml-auto w-full md:max-w-[658px] p-10 z-10">
          <div className="flex flex-col md:flex-row">
            <p className="font-bold text-3xl md:text-4xl lg:text-5xl text-white ">
              <UniformText parameterId="title" />
            </p>
            <div className="w-full">
              {Boolean(description) && (
                <p className="font-extrabold text-white">
                  <UniformText parameterId="description" />
                </p>
              )}
              {submitButtonText && (
                <>
                  <Input
                    id="email"
                    label="Email"
                    className="text-white"
                    value={email}
                    onChange={handleInputChange}
                    errorMessage={isError ? 'Please Enter a valid email address' : ''}
                  />
                  <Button.Action
                    styleType="primary"
                    type="submit"
                    className="text-sm max-w-full sm:max-w-max"
                    onClick={handleButtonClick}
                    disabled={!email || isError}
                  >
                    <span>
                      <UniformText parameterId="submitButtonText" />
                    </span>
                  </Button.Action>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

registerUniformComponent({
  type: 'emailSignupForm',
  component: withContent(EmailSignupForm),
});

// Register for Promotion AI page
registerUniformComponent({
  type: 'emailSignupFormAI',
  component: withContent(EmailSignupForm),
});

export default EmailSignupForm;
