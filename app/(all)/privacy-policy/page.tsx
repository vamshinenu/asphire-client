import React from 'react';
import Head from 'next/head';


export default function PrivacyPolicy() {
    return (
        <div className='px-8 text-center text-white'>
            <Head>
                <title>Privacy Policy | Asphire Education</title>
            </Head>

            <h1 className='text-3xl font-medium'>Privacy Policy for Asphire Education</h1>
            <p className='text-zinc-600'>Last updated: July 4, 2023</p>
            <p>{
                `At Asphire, your privacy is really important to us. We know that privacy policies can be confusing, so we'll do our best to explain everything clearly. This Privacy Policy tells you about the ways we use and look after your personal information when you use our Asphire Education Application (we'll call this "the App" from now on).`
            }</p>

            <h2 className='text-xl font-bold text-zinc-200'>1. Information We Collect</h2>
            <p className='mb-4'>{`When you use our App, we might ask you for some information about you. This could be things like your name, your email address, and your profile picture. We only ask for this so that we can check it's really you when you log into the App.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>2. How We Use Your Information</h2>
            <p className='mb-4'>{`We use the information you give us to make sure it's really you when you log into the App. We check the email address you give us against the one we have in our system. If they match up, we know it's you and you can start using the App. This is the only thing we use your information for - we won't use it for anything else.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>3. Sharing of Information</h2>
            <p className=''>{`We don't show or sell your personal information to any other companies or people. We know that your information is private, and we do our best to keep it that way.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>4. Data Storage and Security</h2>
            <p className='mb-4'>{`We keep your information in a place called PlanetScale SQL. This is a really safe place to store information because it uses special controls to stop people who shouldn't have your information from seeing it. And because we only process your information in India, we follow all the local rules and regulations to keep your information safe.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>5. User Rights</h2>
            <p className='mb-4'>{`If you don't want us to have your information anymore, all you have to do is ask. You can do this by talking to our administrator or mail at ask@asphire.co. As soon as we get your request, we'll delete all your information, as long as you agree to it.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>6. Data Retention</h2>
            <p className='mb-4'>{`We keep your information for as long as you're using our services. If you stop using our services and tell us it's okay, we'll delete all your information.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>7. Cookies and Tracking</h2>
            <p className='mb-4'>{`We don't use anything called cookies or similar tracking things. We do use something called server-side sessions, which lets us check if it's really you logging in, but we don't use any other tracking things that stay on your device after you leave the App.`}</p>

            <h2 className='text-xl font-bold text-zinc-200'>8. Age Restrictions and User Approval Process</h2>
            <div className='mb-4'>
                <span>{`Our App doesn't have a specific age limit, but there's an approval process in place before anyone can start using our services. Here's how it works:`}</span>
                <br /><br />
                <span>{`Step 1: Before you start using the App, you need to get in touch with us first. The best way to do this is through our contact form.`}</span>
                <br /><br />
                <span>{`Step 2: We'll chat about the services we provide and see if they're the right fit for you.`}</span>
                <br /><br />
                <span>{`Step 3: If everything aligns well, we'll ask for your Gmail address. This will be the email address that you'll use to sign in to our App.`}</span>
                <br /><br />
                <span>{`Step 4: We'll add your email to our user database. Once we do this, you'll be able to sign in to our App using the "Sign in with Google" option.`}</span>
                <br /><br />
                <span>{`This process ensures that our services are provided only to users who have been approved by our team. If you have any questions about this process or need assistance, feel free to get in touch with us.`}</span>
            </div>

            <h2 className='text-xl font-bold text-zinc-200'>9. Contact Information</h2>
            <p className='mb-4'>{`If you have any questions or you're worried about your privacy when you're using the App, we're here to help. You can email us at ask@asphire.co or call our administrator.
                We might change our Privacy Policy from time to time, but if we do, we'll tell you about it here and let you know.`}</p>
        </div>
    );
}
