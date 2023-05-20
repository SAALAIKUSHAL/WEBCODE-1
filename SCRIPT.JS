function highlightText(text, search) {
    return text.replace(new RegExp(search, "gi"), match => `<mark>${match}</mark>`);
}
//to fetch data from API
async function fetchNationality() {
    const name = document.getElementById('nameInput').value;
    const url = `https://api.nationalize.io/?name=${name}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = "";

        if (data.country.length > 0) {
            const topCountries = data.country.slice(0, 2);
            topCountries.forEach(country => {
                const nationality = country.country_id;
                const probability = country.probability;

                const nationalityText = highlightText(nationality, name);
                const probabilityText = highlightText(probability.toString(), name);

                const countryInfo = `<p>Most likely nationality: ${nationalityText}</p>
                                <p>Probability: ${probabilityText}</p>`;
                                

                resultDiv.innerHTML += countryInfo;
            });

         // FOR INVALID INPUT

        } else {
            resultDiv.innerText = "No nationality information found.";
        }
        // IN CASE OF ERROR
    
    } catch (error) {
        console.log("An error occurred:", error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerText = "Error occurred while fetching data.";
    }
}
