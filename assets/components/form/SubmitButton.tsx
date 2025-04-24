import {Button} from "@/components/ui/button";
import React from "react";

interface SubmitButtonProps {
    submittingText: string;
    csrfLoadingText: string;
    text: string;
    isSubmitting: boolean;
    isCsrfLoading: boolean;
}

export default function SubmitButton({
                                         submittingText = 'Submitting...',
                                         csrfLoadingText = 'Preparing...',
                                         text = 'Submit',
                                         isSubmitting,
                                         isCsrfLoading,
                                     }: SubmitButtonProps) {

    return <Button type="submit" className="w-full" disabled={isSubmitting || isCsrfLoading}>
        {isSubmitting ? submittingText : (isCsrfLoading ? csrfLoadingText : text)}
    </Button>
}