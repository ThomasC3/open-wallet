document.addEventListener('DOMContentLoaded', () => {
    const createWalletBtn = document.getElementById('createWalletBtn');
    const walletDetails = document.getElementById('walletDetails');
    const walletData = document.getElementById('walletData');
    const error = document.getElementById('error');

    const API_URL = 'http://localhost:3000/api/v1';

    createWalletBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/wallet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 'user123', // Replace with a dynamic user ID in a real app
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                walletData.textContent = JSON.stringify(result.data, null, 2);
                walletDetails.classList.remove('hidden');
                error.classList.add('hidden');
            } else {
                throw new Error(result.message || 'Failed to create wallet');
            }
        } catch (e) {
            error.textContent = e.message;
            error.classList.remove('hidden');
            walletDetails.classList.add('hidden');
        }
    });
});
