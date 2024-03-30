// // We are passing `pet` and `setPet` as props to `FileSelector` so we can
// // set the file we selected to the pet state on the `Form` outer scope
// // and keep this component stateless.
// const FileSelector = ({ pet, setPet }) => {

//     // Read the FileList from the file input component, then
//     // set the first File object to the pet state.
//     const readFiles = (event) => {
//         const files = event.target.files;
//         if (files.length > 0) {
//             console.log("llo", files[0]);
//             setPet(files[0]);
//         }
//     };

//     return (
//         <div className="">
//             <label for="fileInput">Image</label>
//             {/* Add readFiles as the onChange handler. */}
//             <input type="file" onChange={readFiles} />
//         </div>
//     );
// };

// export default FileSelector;
import React from 'react';

const FileSelector = ({ pet, setPet }) => {
    // Read the FileList from the file input component, then
    // set the first File object to the pet state.
    const readFiles = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setPet(files[0]);
        }
    };

    return (
        <div className="">
            <label htmlFor="fileInput">Image</label>
            {/* Add readFiles as the onChange handler. */}
            <input type="file" id="fileInput" onChange={readFiles} />
            {/* Display the image preview */}
            {pet && (
                <div>
                    <h2>Preview:</h2>
                    <img src={URL.createObjectURL(pet)} alt="Selected" style={{ maxWidth: '40%' }} />
                </div>
            )}
        </div>
    );
};

export default FileSelector;
