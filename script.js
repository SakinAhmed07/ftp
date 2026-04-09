function startOoklaTest() {
    const progressCircle = document.getElementById('progress');
    const speedDisplay = document.getElementById('speed-value');
    const downDisplay = document.getElementById('stat-down');
    const upDisplay = document.getElementById('stat-up');
    const btn = document.getElementById('startBtn');

    if (!btn || btn.disabled) return;

    // বাটন লক করা
    btn.disabled = true;
    btn.classList.add('testing');
    btn.querySelector('.btn-text').textContent = "WAIT";

    // ৩/৪ সার্কেলের পরিধি
    const circumference = 424;
    progressCircle.style.strokeDasharray = `424 565`;
    progressCircle.style.strokeDashoffset = 424;

    // ফেক স্পিড জেনারেট (৮০-৯৮ এর মধ্যে)
    const targetSpeed = (Math.random() * (98 - 80) + 80).toFixed(1);
    const targetUp = (targetSpeed * 0.82).toFixed(1);

    let startTime = null;
    const duration = 4000; // ৪ সেকেন্ড টেস্ট

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // ইজিং ইফেক্ট
        const ease = 1 - Math.pow(1 - progress, 3);
        const jitter = (Math.random() * 2 - 1) * (1 - progress);
        const currentSpeed = Math.max(0, (ease * targetSpeed + jitter)).toFixed(1);

        // ডিসপ্লে আপডেট
        speedDisplay.textContent = currentSpeed;

        // সার্কেল আপডেট
        const offset = 424 - (currentSpeed / 100) * 424;
        progressCircle.style.strokeDashoffset = offset;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // সম্পন্ন
            speedDisplay.textContent = targetSpeed;
            downDisplay.textContent = Math.floor(targetSpeed);
            upDisplay.textContent = Math.floor(targetUp);

            btn.disabled = false;
            btn.classList.remove('testing');
            btn.querySelector('.btn-text').textContent = "GO";
        }
    }

    requestAnimationFrame(update);
}