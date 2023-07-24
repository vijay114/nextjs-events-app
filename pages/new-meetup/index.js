import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";

function NewMeetupPage() {

    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        console.log(enteredMeetupData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        await router.push('/');

    }

    return (<Fragment>
        <Head>
            <title>Add an Event</title>
            <meta name='description' content='Add a new event'/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>)
}

export default NewMeetupPage;