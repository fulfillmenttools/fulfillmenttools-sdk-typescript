import {
  FftApiClient,
  FftFacilityService,
} from "@fulfillmenttools/fulfillmenttools-sdk-typescript";

var projectId = "<your-fulfillmenttools-project>";
var apiUser = "<your-fulfillmenttools-user>";
var apiPassword = '<your-fulfillmenttools-password>';
var apiKey = '<your-fulfillmenttools-api-key>';

// Builds the client
var fftApiClient = new FftApiClient(projectId, apiUser, apiPassword, apiKey);
var fftFacilityService = new FftFacilityService(fftApiClient);

// Returns the facility details
function getFacilityDetails() {
  const facilityId = document.getElementById("facilityInput").value;
  if (!facilityId) return;
  console.log("Retrieving facility information", [projectId, facilityId]);
  window.document.getElementById("myButton").disabled = true;
  fftFacilityService.getFacility(facilityId)
  .then((body) => {
    console.log('Received response from fft', body);
    window.document.getElementById('facilityDetails').innerHTML =
      '<pre>' + JSON.stringify(body, undefined, 2) + '</pre>';
  })
  .catch((err) => {
    console.error("Received error from fft", err);
    window.document.getElementById('facilityDetails').innerHTML = 'Error';
  })
  .finally(() => {
    window.document.getElementById("myButton").disabled = false;
  });
}

// Makes function globally available
window.getFacilityDetails = getFacilityDetails;
