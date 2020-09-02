
// TODO this needs to be calculated based on the total images / 500 (request count to retrieve
//  all images) and by hourly limit (500). I.e. if we had 100000 images we would need 100000 /
//  500 = 200 requests to retrieve all images. This means we could do this task every 2.5 times
//  per hour (most likely once an hour would be best). With current images (< 1000) we will need
//  to make 2 requests to retrieve all image data. So we could execute this job maximum 500 / 2 =
//  250 times per hour (4 times per minute or every 15 seconds). Good cron job would be to run
//  it every minute.
export const CLOUDINARY_JOB_CRON = '0 */1 * * * *';
