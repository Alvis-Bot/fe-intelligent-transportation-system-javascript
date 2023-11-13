
const CheckboxIcon = () => {
    function onchange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    return (
        <label>
            <input
                type="checkbox"
                onChange={onchange}
                name=""
                value=""
                style={{display: 'none' }}
            />
            <svg
                className="customcheckbox"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xmidymid"
                width="20"
                height="20"
                viewBox="0 0 25 28"
            >
                <path
                    d="m8 0v2h8v-2h-8zm0 24v-2h8v2h-8zm10-24h6v6h-2v-4h-4v-2zm-18 8h2v8h-2v-8zm0-2v-6h6v2h-4v4h-2zm24 10h-2v-8h2v8zm0 2v6h-6v-2h4v-4h2zm-18 6h-6v-6h2v4h4v2zm12-18h-12v12h12v-12z"
                    className="cls-1"
                />
            </svg>
        </label>
    );
}