function startOoklaTest() {
    const progressCircle = document.getElementById('progress');
    const speedDisplay = document.getElementById('speed-value');
    const downDisplay = document.getElementById('stat-down');
    const upDisplay = document.getElementById('stat-up');
    const btn = document.getElementById('startBtn');
    const testLabel = document.getElementById('test-label'); // নতুন লেবেল

    btn.disabled = true;
    btn.classList.add('testing');
    btn.querySelector('.btn-text').textContent = "WAIT";

    // ✅ ফাইনাল ফেক স্পিড জেনারেট
    const finalDownload = Math.floor(Math.random() * 100) + 10; // 10–110 Mbps
    const finalUpload = Math.floor(Math.random() * 50) + 5; // 5–55 Mbps

    let steps = 10; // মোট ১৫ সেকেন্ড
    let counter = 0;

    // প্রথমে ডাউনলোড টেস্ট
    testLabel.textContent = "Download...";
    const downloadTimer = setInterval(() => {
        counter++;
        let currentDownload = Math.floor((finalDownload / steps) * counter);

        speedDisplay.textContent = currentDownload;
        downDisplay.textContent = currentDownload;

        const offset = 424 - (currentDownload / 100) * 424;
        progressCircle.style.strokeDashoffset = offset;

        if (counter >= steps) {
            clearInterval(downloadTimer);

            // ডাউনলোড শেষ হলে আপলোড শুরু
            let uploadCounter = 0;
            testLabel.textContent = "Upload...";
            const uploadTimer = setInterval(() => {
                uploadCounter++;
                let currentUpload = Math.floor((finalUpload / steps) * uploadCounter);

                speedDisplay.textContent = currentUpload;
                upDisplay.textContent = currentUpload;

                const offset = 424 - (currentUpload / 100) * 424;
                progressCircle.style.strokeDashoffset = offset;

                if (uploadCounter >= steps) {
                    clearInterval(uploadTimer);

                    // ফাইনাল ভ্যালু সেট করা
                    speedDisplay.textContent = finalUpload;
                    upDisplay.textContent = finalUpload;

                    testLabel.textContent = "Test Completed ✅";
                    btn.disabled = false;
                    btn.classList.remove('testing');
                    btn.querySelector('.btn-text').textContent = "GO";
                }
            }, 1000);
        }
    }, 1000);
}
