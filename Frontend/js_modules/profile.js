import { printReadList } from "./printReadList.js"

export let profileSite = () => {

    document.querySelector("#container").innerHTML = `
    <aside id="content_header">
                    <section id="profile">
                        <section id="profile__pic"><i class="fa-solid fa-user fa-2xl"></i></section>
                        <p id="profile__name" class="login">${sessionStorage.getItem("user")}</p>
                    </section>
                    <section id="profile__menu">
                        <ul>
                            <li id="read">Min Läslista</li>
                            <li>Mina betyg</li>
                        </ul>
                        <select name="Filter" id="filter">
                            <option value="filtrera" disabled selected>filtrera</option>
                            <option value="efter högsta betyg">efter högsta betyg</option>
                            <option value="efter lägsta betyg">efter lägsta betyg</option>
                            <option value="A-Ö">A-Ö</option>
                            <option value="Datum">Datum</option>
                            
                        </select>
                    </section>
                </aside>
                <main id="content">
                </main>
    `
    printReadList();
}