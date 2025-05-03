import React from "react";


export function loadSymfonyForm() {
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState(null);

    React.useEffect(() => {
        async function fetchForm() {
            try {
                const response = await fetch('/register/render', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Failed to fetch form:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching form:', error);
            } finally {
                setLoading(false);
            }
        }

        void fetchForm();
    }, []);

    return {loading, formData};
}