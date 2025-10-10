import { useForm } from '@tanstack/react-form';
import '../styles/FeedbackForm.scss';
import { showToast } from '../utils/toast';

export default function FeedbackForm() {
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            message: '',
        },
        onSubmit: async ({ value }) => {
            const BOT_TOKEN = '7803903633:AAEb5EV_joW9sVv1ijxRKI2WAHvbo4dXz34'
            const CHAT_ID = '-4842616045'

            const msg =
                `<b>Name: </b>${value.firstName}%0a` +
                `<b>Last Name: </b>${value.lastName}%0a` +
                `<b>Phone Number: </b>${value.phone}%0a` +
                `<b>Email: </b>${value.email}%0a`+
                `<b>Message: </b>${value.message}`

            try {
                const resp = await fetch(
                    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=html&text=${msg}`
                );
                const answer = await resp.json();
                if (answer.ok) {
                    showToast.info('Message sent successfully');
                    form.reset()
                } else {
                    showToast.error('Some error occurred');
                }
            } catch (err) {
                showToast.error('Network error');
            }
        },
    });

return(
    <form onSubmit = { form.handleSubmit } className = 'contactForm' >
        <h2 className='headerForm'>Contact Us</h2>
        <div className='fieldSet'>
            <form.Field
                name="firstName"
                validators={{
                    onChange: (value) =>
                        value.length < 2 ? 'Enter your first name' : undefined,
                }}
            >
                {(field) => (
                    <div className="input-wrapper">
                        <label htmlFor="firstName">Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors?.[0] && <span>{field.state.meta.errors[0]}</span>}
                    </div>
                )}
            </form.Field>

            <form.Field
                name="lastName"
                validators={{
                    onChange: (value) =>
                        value.length < 2 ? 'Enter last name' : undefined,
                }}
            >
                {(field) => (
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors?.[0] && <span>{field.state.meta.errors[0]}</span>}
                    </div>
                )}
            </form.Field>
        </div>
        <div className='fieldSet'>
            <form.Field
                name="phone"
                // validators={{
                //     onChange: (value) =>
                //         /^\+?\d{10,15}$/.test(value) ? undefined : 'Incorrect phone number',
                // }}
            >
                {(field) => (
                    <div>
                        <label htmlFor="phone">Phone number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        />
                        {field.state.meta.errors?.[0] && <span>{field.state.meta.errors[0]}</span>}
                    </div>
                )}
            </form.Field>

            <form.Field
                name="email"
                // validators={{
                //     onChange: (value) =>
                //         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Invalid email',
                // }}
            >
                {(field) => (
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors?.[0] && <span>{field.state.meta.errors[0]}</span>}
                    </div>
                )}
            </form.Field>
        </div>
        <form.Field
            name="message"
            validators={{
                onChange: (value) =>
                    value.length < 5 ? 'The message must be at least 5 characters long' : undefined,
            }}
        >
            {(field) => (
                <div>
                    <label htmlFor="msg">Message</label>
                    <textarea
                        id="msg"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && <span>{field.state.meta.errors[0]}</span>}
                </div>
            )}
        </form.Field>

        <button type="submit" className="btnForm neon-pulse">SEND</button>
    </form >
);
}
