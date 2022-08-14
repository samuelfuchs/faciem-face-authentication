function handleError(errCode) {
    switch (errCode) {
        case fioErrCode.PERMISSION_REFUSED:
            return ("Access to the Camera stream was denied by the end user");
            break;
        case fioErrCode.NO_FACES_DETECTED:
            return ("No faces were detected during the enroll or authentication process");
            break;
        case fioErrCode.UNRECOGNIZED_FACE:
            return ("Unrecognized face on this application's Facial Index");
            break;
        case fioErrCode.MANY_FACES:
            return ("Two or more faces were detected during the scan process");
            break;
        case fioErrCode.PAD_ATTACK:
            return ("Presentation (Spoof) Attack (PAD) detected during the scan process");
            break;
        case fioErrCode.FACE_MISMATCH:
            return ("Calculated Facial Vectors of the user being enrolled do not matches");
            break;
        case fioErrCode.WRONG_PIN_CODE:
            return ("Wrong PIN code supplied by the user being authenticated");
            break;
        case fioErrCode.PROCESSING_ERR:
            return ("Server side error");
            break;
        case fioErrCode.UNAUTHORIZED:
            return ("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information");
            break;
        case fioErrCode.TERMS_NOT_ACCEPTED:
            return ("Terms & Conditions set out by FACEIO/host application rejected by the end user");
            break;
        case fioErrCode.UI_NOT_READY:
            return ("The FACEIO Widget code could not be (or is being) injected onto the client DOM");
            break;
        case fioErrCode.SESSION_EXPIRED:
            return ("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly");
            break;
        case fioErrCode.TIMEOUT:
            return ("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)");
            break;
        case fioErrCode.TOO_MANY_REQUESTS:
            return ("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications");
            break;
        case fioErrCode.EMPTY_ORIGIN:
            return ("Origin or Referer HTTP request header is empty or missing");
            break;
        case fioErrCode.FORBIDDDEN_ORIGIN:
            return ("Domain origin is forbidden from instantiating fio.js");
            break;
        case fioErrCode.FORBIDDDEN_COUNTRY:
            return ("Country ISO-3166-1 Code is forbidden from instantiating fio.js");
            break;
        case fioErrCode.SESSION_IN_PROGRESS:
            return ("Another authentication or enrollment session is in progress");
            break;
        case fioErrCode.NETWORK_IO:
        default:
            return ("Error while establishing network connection with the target FACEIO processing node");
            break;
    }
}

export default handleError