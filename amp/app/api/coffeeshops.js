import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
    try {
        console.log('Fetching data from external site...');
        const url = 'https://www.coffeeshopdirect.com/Map.html';
        const { data } = await axios.get(url);
        console.log('Data fetched successfully.');

        const $ = cheerio.load(data);
        const coffeeshops = [];

        $('script').each((i, script) => {
            const scriptContent = $(script).html();
            if (scriptContent.includes('new google.maps.Marker')) {
                const matches = scriptContent.match(/new google.maps.Marker\(\{.*?\}\);/g);

                if (matches) {
                    matches.forEach((match) => {
                        const latMatch = match.match(/lat: (-?\d+\.\d+)/);
                        const lngMatch = match.match(/lng: (-?\d+\.\d+)/);
                        const nameMatch = match.match(/title: '(.*?)'/);

                        if (latMatch && lngMatch && nameMatch) {
                            const coffeeshop = {
                                name: nameMatch[1],
                                lat: parseFloat(latMatch[1]),
                                lng: parseFloat(lngMatch[1]),
                            };
                            coffeeshops.push(coffeeshop);
                        }
                    });
                }
            }
        });

        console.log('Parsed coffeeshops:', coffeeshops);
        res.status(200).json(coffeeshops);
    } catch (error) {
        console.error('Error fetching coffee shops:', error);
        res.status(500).json({ error: 'Failed to fetch coffee shops' });
    }
}
