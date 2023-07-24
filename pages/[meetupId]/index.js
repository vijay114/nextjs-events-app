import MeetupDetails from "@/components/meetups/MeetupDetails";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";


function MeetupDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetails
                image={props.meetupData.image}
                title={props.meetupData.title}
                description={props.meetupData.description}
                address={props.meetupData.address}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups')
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, {'_id': 1}).toArray();

    await client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups')
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)});

    await client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetailPage;