import requests
import json
import time

# API endpoint
API_URL = "http://localhost:3000/api/aiAgent/"  # Change URL if hosted online


def send_query(user_input, retries=3, delay=2):
    """
    Sends a query to the AI agent API with retry support.

    :param user_input: The user query to send
    :param retries: Number of retry attempts in case of failure
    :param delay: Delay between retries in seconds
    """
    payload = {"userInput": user_input}

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(API_URL, json=payload, timeout=5)

            if response.status_code == 200:
                response_data = response.json()
                print("\n✅ Response:")
                print(json.dumps(response_data, indent=2))  # Pretty print JSON
                return response_data

            else:
                print(f"\n⚠️ Error {response.status_code}: {response.text}")

        except requests.exceptions.ConnectionError:
            print("\n🚨 Error: Unable to connect to the server. Is it running?")
        except requests.exceptions.Timeout:
            print("\n⏳ Error: The request timed out.")
        except requests.exceptions.RequestException as e:
            print(f"\n❌ Unexpected error: {str(e)}")

        if attempt < retries:
            print(f"Retrying in {delay} seconds... ({attempt}/{retries})")
            time.sleep(delay)

    print("\n❌ Failed to get a valid response after multiple attempts.")
    return None


if __name__ == "__main__":
    user_query = input("\n💬 Enter your transaction query: ").strip()

    if user_query:
        send_query(user_query)
    else:
        print("\n⚠️ Error: Query cannot be empty.")
