import axios from "axios";
const getIssues = async () => {
    const { data } = await axios.get('https://api.github.com/repos/CatsAndMice/Blog/issues');
    console.log(data);
}

getIssues()