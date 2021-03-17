import MailchimpSubscribe from 'react-mailchimp-subscribe'
import StyledButton from './primitives/Button'
import StyledInput from './primitives/Input'
import Text from './primitives/Text'
import Box from './primitives/Box'

/*

Finn url:
Signup forms » Embedded forms » Copy/paste onto your site

Oversettelse:
Signup forms » From builder » Translate it

*/

const CustomForm = ({ status, message, onValidated }) => {
  let email
  // let name
  const submit = () =>
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      // NAME: name.value,
    })
  const isSending = status === 'sending'
  return (
    <Box textAlign="center">
      {/* <input
        style={{ fontSize: '2em', padding: 5 }}
        ref={(node) => (name = node)}
        type="text"
        placeholder="Your name"
      />
      <br /> */}
      <label>
        <span>E-post</span>
        <br />
        <StyledInput
          as="input"
          ref={(node) => (email = node)}
          type="email"
          placeholder="Din e-postadresse"
        />
      </label>
      {isSending && (
        <Box mt={2}>
          <Text size="small">Sender</Text>
        </Box>
      )}
      {message && ['success', 'error'].indexOf(status) !== -1 && (
        <Box
          mt={2}
          className={`Message Message--${status}`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <Box as="footer" mt={2}>
        <StyledButton
          as="button"
          size="lg"
          type="primary"
          disabled={isSending}
          onClick={submit}
        >
          Sett meg på liste
        </StyledButton>
      </Box>
    </Box>
  )
}

// Default fallback url
const MAILCHIMP_URL =
  'https://praksismagasin.us7.list-manage.com/subscribe/post?u=f53db79c2dbc0eaa7917ea8bb&id=1648f7b3ce'

const NewsletterForm = ({ formUrl = MAILCHIMP_URL, ...props }) => {
  return (
    <MailchimpSubscribe
      url={formUrl}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  )
}

export default NewsletterForm
