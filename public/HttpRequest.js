export default class HttpRequest {

    constructor($scope) {

        const Http = new XMLHttpRequest();
        const HttpList = new XMLHttpRequest();
        this.uploadMediaToS3(Http)
        // this.sendToSQS();
        const urlList = 'http://ec2-34-230-42-229.compute-1.amazonaws.com/list';
        HttpList.open("GET", urlList);
        HttpList.send();
        HttpList.onreadystatechange = (e) => {
            $scope.todos = []
            const obj = JSON.parse(HttpList.responseText);
            $scope.todos = obj.list;
            $scope.$apply();

        };


        document.getElementById("transform").addEventListener("click", function () {
            console.log($scope.list)
            const HttpSqs = new XMLHttpRequest();
            // console.log($scope.list)
            async function foo(){
            for (let i = 0; i < $scope.list.length; i++) {
                    // if ($scope.list.length == 1) break;
                
                    name = $scope.todos[$scope.list[i]]
                    console.log("name")
                    console.log(name)
                    var params = 'name=' + name
                    HttpSqs.open("POST", "http://ec2-34-230-42-229.compute-1.amazonaws.com/sendtosqs", true);
                    HttpSqs.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    HttpSqs.send(params);

                    //do what you need here
                    const promise = await new Promise((resolve,reject)=>{
                        setTimeout(() => resolve("finished"),2000);
                    })
               
                     HttpSqs.onreadystatechange = (e) => {
                    // console.log(name);

                };


            }
           
        }
        foo()
        


        })



    }


    getSignedURL(Http, fileName) {

        const url = 'http://ec2-34-230-42-229.compute-1.amazonaws.com/test?filename=' + fileName;
        Http.open("GET", url);
        Http.send();
        // Http.onreadystatechange = (e) => {

        //   urlSigned = Http.responseText;
        //   console.log(Http.responseText)

        // }

    };


    uploadMediaToS3(Http) {

        document.getElementById("file-input").onchange = () => {
            const files = document.getElementById('file-input').files;
            const file = files[0];
            if (file == null) {
                return alert('No file selected.');
            }
            console.log("wybrano plik")

            var xhr = new XMLHttpRequest();
            this.getSignedURL(Http, file.name);
            Http.onreadystatechange = (e) => {
                let url = Http.responseText;
                //   let url = "http://testowybucket.s3.amazonaws.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAWI3G2UXHDM6OEDOQ%2F20200919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200919T171349Z&X-Amz-Expires=240&X-Amz-Security-Token=FwoGZXIvYXdzEEMaDNX%2BV4lpC8rMP9janyLDAW5TmuTWY0m5%2BWhbH%2BfA6Jxr3ZUU8ey5ROLXJXlftBjlij%2BnSLzB7H3dgi2EQyKLtRYswOBy7rhuaAa3ue1vq8Hxw8OOcqOna5x6TPLvv1g4nxoU%2FDxQiqhK1jTzeNUe3jdVPL65BB%2FC2dXY1U7CEOhvkkqr7fuhfNhmjttuzW0ZT4W23yaD150yYwCxoWJw0EvW10nyN1LP7luqYe%2B2KzQwTvaFgd5t3NPbeZ4p%2BXsuOQP9GDrespUsEwwCSohj7mSDtyj595j7BTItmmTwNw7uS5rhKxRtbRN8Fsw15zGYy5KLDZPr8M37X0Iwj%2BPM02wpZULusp%2FW&X-Amz-Signature=5478cab585541cf81749462e09ddc98752f258f30b4b07506f1de04860a94318&X-Amz-SignedHeaders=host"
                xhr.open('put', url, true)

                xhr.send(file);
                xhr.onreadystatechange = (e) => {
                    console.log(xhr.responseText)
                };
            };

        }

    };

    sendToSQS(name) {

        const HttpSqs = new XMLHttpRequest();
        var params = 'name=' + name
        HttpSqs.open("POST", "http://ec2-34-230-42-229.compute-1.amazonaws.com/sendtosqs", true);
        HttpSqs.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        HttpSqs.send(params);
        HttpSqs.onreadystatechange = (e) => {
            console.log(name);
            return 1;
        };




    }






}