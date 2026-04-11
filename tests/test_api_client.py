from python_test.api.api_client import APIClient


def test_get_posts():
    client = APIClient("https://jsonplaceholder.typicode.com")
    data = client.get("posts")

    print("Total posts:", len(data))
    print("First post title:", data[0]["title"])


if __name__ == "__main__":
    test_get_posts()
