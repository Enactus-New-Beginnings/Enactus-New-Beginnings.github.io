import React from 'react';
// import { Table } from 'reactstrap';
// import { useLoaderData } from 'react-router-dom'
import '../styles/Contact.css'
// import { useEffect } from 'react';

/**
 * Allows the user to get into contact with us through an email.
 * @module Contact
 */


export default function Contact() {
    // You can uncomment and use the following lines if needed
    // const data = useLoaderData();
    // useEffect(() => { console.log(data) }, [data]);

    return (
    <div className="contact-container">
    <h1>Contact Us</h1>

    <form id="contactForm">
        <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        </div>

        <div>
        <label htmlFor="contactInfo">Contact Information:</label>
        <input type="text" id="contactInfo" name="contactInfo" required />
        </div>

        <div>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />
        </div>

        <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" cols="50" rows="10" required></textarea>
        </div>

        <div>
        <button type="submit">Send Message</button>
        </div>
    </form>

    <script src="../components/contactFormScript.js"></script>
    </div>
    );
}