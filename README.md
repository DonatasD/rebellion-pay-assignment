# Rebellion Test Backender

Hola Rebel! This is the test. Good luck!

## Access to Cloudinary

```
cloud_name: 'dbnuvqzms', 
api_key: '469833719843844', 
api_secret: 'taehOwTLrO0WU02HBqFPQpo8YoE'
```

## Description

We would like to start to use Cloudinary to save some public photos, but we are afraid about the use some people could do of this platform.

We need a Microservice with 2 calls made with Node.js.

This application is going to run into a cluster so it could be good dockerize the application.

### Get some statistics

Sample URL: SOME_URL/client/statistics

Showing the info (sample):

```
{
    totalImages: 1000,
    formats: {
        jpg: 23,
        png: 300,
        svg: 677
    },
    biggestPicture: 'https://res.client.com/dbnuvqzms/image/upload/v1580932194/wallhdpic_20_fsou0u.jpg',
    smallestPicutre: 'https://res.client.com/dbnuvqzms/image/upload/v1580932187/wallhdpic_1_gwkxuu.jpg',
    avgSize: 3002
}

```

### Get a csv

Sample URL: SOME_URL/client/csv

Returns a CSV file with a list of All images hosted in Cloudinary (sample):

```
public_id,folder,filename,format,version,resource_type,type,created_at,uploaded_at,bytes,backup_bytes,width,height,aspect_ratio,pixels,url,secure_url,status,access_mode,access_control,etag,created_by/0,uploaded_by/0
wallhdpic_1_gwkxuu,,wallhdpic_1_gwkxuu,jpg,1580932187,image,upload,2020-02-05T19:49:47+00:00,2020-02-05T19:49:47+00:00,467357,0,1920,1080,1.77778,2073600,http://res.client.com/dbnuvqzms/image/upload/v1580932187/wallhdpic_1_gwkxuu.jpg,https://res.client.com/dbnuvqzms/image/upload/v1580932187/wallhdpic_1_gwkxuu.jpg,active,public,,cfd15df0cbe6bfebe8bfd6abd596e75e,,
...
```

## Final words

You can share your work in Gitlab, Github, ... even in this server 😊

There is no right or wrong here, but whatever you come up with will be considered as an indicator towards your abilities to think on your own feet and how your personality might positively impact your code. Surprise us!

🤘 May the force be with you 🤘

# Running Project
## Setup environment variables
```
cp .env.example .env
```

## Start commands
```
npm run start:dev
```
or
```
npm run build
npm run start
```
or
```
docker-compose -f docker-compose.yml up --build -d
```

# Accessing API
## Local env
* http://localhost:3000/client/statistics
* http://localhost:3000/client/csv

## Hosted env
* http://ec2-3-10-140-218.eu-west-2.compute.amazonaws.com:3000/client/statistics
* http://ec2-3-10-140-218.eu-west-2.compute.amazonaws.com:3000/client/csv

> Hosted on personal aws account(micro instance ec2), uses dynamic ip so let me know if it becomes
> unreachable

# Solution
## Main Integration Issue
* Cloudinary API call limit
* Aggregation is unavailable for tier 1
* /csv endpoint and avgSize calculation requires retrieving all images (other /statistics
 endpoint calculations can be done using search API)

## Solution Idea
* Use caching to minimize requests to Cloudinary
* /csv endpoint requires retrieving all data, so calculations for /statistics can be done reusing
 same data.
* Run scheduled job that updates the cache in time intervals to update cache.

## Remaining Issues
* API provided goes out of sync after changes has been made in Cloudinary. Cache updates makes this
 issue less often, however does not guarantee real time data.
* Choosing good cache update interval.
* Scaling the app(spawning multiple instances) would require using centralized cache (sharing
 cache between apps).
