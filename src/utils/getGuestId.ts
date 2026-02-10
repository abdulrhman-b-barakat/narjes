const getGuestId = () => {
    const guestId = localStorage.getItem("guestId");

    if (!guestId) {
        localStorage.setItem("guestId", `guest_${new Date().getTime()}`);
    }

    return guestId;
}
export default getGuestId;