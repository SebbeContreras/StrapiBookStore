export let addBookRated = async (bookId) => {
    let res = await fetch(`http://localhost:1337/api/Users/${sessionStorage.getItem("id")}?populate=*`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({            
                rates: {
                    connect: [bookId],
                }
        }),
    });
};