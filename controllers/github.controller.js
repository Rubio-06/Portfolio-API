import dotenv from "dotenv";

dotenv.config();

export async function getProjects(req, res) {
    try {
        const githubUsername = process.env.GITHUB_USERNAME;
        const githubToken = process.env.GITHUB_TOKEN;
        const githubUrl = process.env.GITHUB_URL;

        // Requête à l'API GitHub pour récupérer les repos
        const response = await fetch(`${githubUrl + githubUsername}/repos`, {
            headers: {
                Authorization: `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des données : ${response.status}`);
        }

        const data = await response.json();

        console.dir(data)

        // Transforme les projets en objets personnalisés
        const projects = data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || "Aucune description",
            url: repo.html_url,
            readmeUrl: `https://raw.githubusercontent.com/${repo.full_name}/main/README.md`,
            topics: getTopics(repo.topics)
        }));

        res.json({
            success: true,
            projects
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets GitHub :", error);
        res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            error: error.message
        });
    }
}

// Fonction basique pour attribuer des tags en fonction du nom des projets
function getTopics(topics) {
    const topic = topics[0].toLowerCase();
    switch (topic) {
        case "perso":
            return "Projet Perso";
        case "class":
            return "Projet de Classe";
        case "ap":
            return "Projet AP";
        default:
            return "Autre";
    }
}
