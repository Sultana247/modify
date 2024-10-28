from fastapi import FastAPI, HTTPException, Body
from fastapi.responses import FileResponse
import httpx

app = FastAPI()

DID_API_URL = "https://portal.yourdomain.com/api/portal/did"
API_AUTH = ("office@klozer.io", "your_api_token")  # Replace with your actual API token

# Route for serving the HTML file
@app.get("/")
async def read_root():
    return FileResponse('dld.html')

# Route for fetching DID records (GET)
@app.get("/did")
async def get_did_records():
    """
    Fetch all DID records.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(DID_API_URL, auth=API_AUTH)
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch DID records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route for querying DID records (POST)
@app.post("/did/query")
async def query_did_records(payload: dict = Body(...)):
    """
    Query DID records using POST request based on user-specified filters.
    Payload may include filters like 'customer_card_id', 'destination', etc.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(DID_API_URL, json=payload, auth=API_AUTH)
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(status_code=response.status_code, detail="Failed to query DID records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
