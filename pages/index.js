import MeetupList from "@/components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

function HomePage(props) {


    return (
        <Fragment>
            <Head>
                <title>Next Js Events</title>
                <meta name='description' content='Browse a huge list of events'/>
            </Head>
            <MeetupList meetups={props.meetups}/>

        </Fragment>
    )
}

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb://localhost:27017/meetups')
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups =  await meetupCollection.find().toArray();

    await client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }

}

// export async function getServerSideProps(context) {
//
//     const req = context.req;
//     const res = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;