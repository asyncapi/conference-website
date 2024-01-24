import Sponsors from '../../components/Sponsors/sponsors';
import cities from '../../config/city-lists.json';
import speakers from '../../config/speakers.json';

const extractYear = (dateString) => {
    return dateString.split(' ').pop();
}
export async function getStaticProps({ params }) {
    let res = [];
    let yearEvents = [];
    const data = cities.filter((p) => extractYear(p.date) === params.year);
    yearEvents = data;
    for (let i = 0; i < yearEvents.length; i++) {
        let yearIter = yearEvents[i];
        const getSpeakers = speakers.filter((s) => s.city === yearIter?.name);
        yearIter.speakers = getSpeakers[0].lists;
        res.push(yearIter);
    }
    return {
        props: {
            data: res,
        },
    };
}

export async function getStaticPaths() {
    const paths = cities.map((city) => ({
        params: { year: extractYear(city.date) },
    }));
    return {
        paths,
        fallback: false,
    };
}

const Edition = (props) => {
    return <div>
        <p className='text-white'>{JSON.stringify(props.data[0])}</p>
        <div id='sponsors'>
            <Sponsors imgs={['/img/sngular.png', '/img/IBM.png', '/img/postman.png', '/img/apidays.png']} />
        </div>
    </div>
}

export default Edition;