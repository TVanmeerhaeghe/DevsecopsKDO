const request = require("supertest");
const app = require("../server");

describe("GET /lists", () => {
  test("it should return all lists", async () => {
    const response = await request(app).get("/lists");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        name: "Cadeau Anniversaire",
        for_who: "Teo",
        ended: 0,
      },
      {
        id: 3,
        name: "Nouveau nom de la listee",
        for_who: "Moi-même",
        ended: 0,
      },
    ]);
  });
});

describe("GET /lists/:id", () => {
  test("it should return a specific list by ID", async () => {
    const listId = 2;
    const response = await request(app).get(`/lists/${listId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 2,
      name: "Cadeau Anniversaire",
      for_who: "Teo",
      gifts: [
        {
          id: 3,
          name: "Carte Graphique",
          description: "Une jolie 4080",
          price: 600,
          previous_price: null,
        },
        {
          id: 4,
          name: "Gentes chromées",
          description: "Des gentes chromées pour le bolide",
          price: 69.99,
          previous_price: 39.99,
        },
      ],
    });
  });

  test("it should return 404 if no list is found with the given ID", async () => {
    const listId = 55;
    const response = await request(app).get(`/lists/${listId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Aucune liste trouvée avec cet ID",
    });
  });
});

describe("DELETE /lists/delete/:id", () => {
  test("it should delete a specific list by ID", async () => {
    const listId = 1;
    const response = await request(app).delete(`/lists/delete/${listId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Suppression réussis");
  });
});
